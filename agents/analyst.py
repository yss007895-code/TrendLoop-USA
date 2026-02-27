"""
에이전트 A - 분석가 (Analyst)
역할: X(트위터)에서 미국 패션 트렌드 키워드를 검색하고 추출합니다.
라이브러리: tweepy v4 (tweepy.Client - X API v2)
공식 문서: https://docs.tweepy.org/en/stable/client.html#search-tweets
"""

import re
from collections import Counter
from concurrent.futures import ThreadPoolExecutor, as_completed
import tweepy
from config import (
    X_BEARER_TOKEN,
    FASHION_SEED_QUERIES,
    MAX_KEYWORDS,
    MAX_CONSECUTIVE_ERRORS,
)
from safety import tracker


STOP_WORDS = {
    "the", "a", "an", "is", "are", "was", "were", "be", "been", "being",
    "have", "has", "had", "do", "does", "did", "will", "would", "could",
    "should", "may", "might", "shall", "can", "need", "dare", "ought",
    "and", "but", "or", "nor", "not", "so", "yet", "both", "either",
    "neither", "each", "every", "all", "any", "few", "more", "most",
    "other", "some", "such", "no", "only", "own", "same", "than", "too",
    "very", "just", "because", "as", "until", "while", "of", "at", "by",
    "for", "with", "about", "against", "between", "through", "during",
    "before", "after", "above", "below", "to", "from", "up", "down",
    "in", "out", "on", "off", "over", "under", "again", "further",
    "then", "once", "here", "there", "when", "where", "why", "how",
    "this", "that", "these", "those", "i", "me", "my", "myself", "we",
    "our", "you", "your", "he", "him", "his", "she", "her", "it", "its",
    "they", "them", "their", "what", "which", "who", "whom", "rt",
    "https", "http", "amp", "like", "get", "got", "new", "one", "im",
    "dont", "ive", "cant", "really", "love", "best", "want", "know",
}


def _fetch_query_data(client, query):
    """개별 쿼리에 대한 트윗 검색을 수행합니다 (스레드 실행용)."""
    try:
        search_query = f"{query} lang:en -is:retweet"
        # client.search_recent_tweets() - 최근 7일 트윗 검색
        response = client.search_recent_tweets(
            query=search_query,
            max_results=20,
            tweet_fields=["text", "entities"],
        )

        texts = []
        hashtags = []

        if response.data:
            for tweet in response.data:
                texts.append(tweet.text)
                if tweet.entities and "hashtags" in tweet.entities:
                    for tag in tweet.entities["hashtags"]:
                        hashtags.append(tag["tag"].lower())

        return (texts, hashtags, None)
    except tweepy.TooManyRequests:
        return ([], [], "TooManyRequests")
    except tweepy.TweepyException as e:
        return ([], [], e)


def fetch_trending_keywords() -> list[dict]:
    """X API v2로 패션 트렌드 키워드를 추출합니다."""
    if not X_BEARER_TOKEN:
        print("[분석가] 경고: X_BEARER_TOKEN이 설정되지 않았습니다.")
        return _fallback_keywords()

    # tweepy.Client() - X API v2 Bearer Token 인증
    client = tweepy.Client(bearer_token=X_BEARER_TOKEN)

    all_texts: list[str] = []
    all_hashtags: list[str] = []

    # 시작 전 비정상 상태 체크
    if tracker.is_abnormal(MAX_CONSECUTIVE_ERRORS):
        print(f"[분석가] 비정상 동작 감지. 검색을 중단합니다.")
        return _fallback_keywords()

    with ThreadPoolExecutor(max_workers=5) as executor:
        future_to_query = {executor.submit(_fetch_query_data, client, query): query for query in FASHION_SEED_QUERIES}

        for future in as_completed(future_to_query):
            query = future_to_query[future]

            # 결과 처리 중에도 비정상 상태 체크
            if tracker.is_abnormal(MAX_CONSECUTIVE_ERRORS):
                print(f"[분석가] 비정상 동작 감지. 검색을 중단합니다.")
                break

            try:
                texts, tags, error = future.result()

                if error == "TooManyRequests":
                    print("[분석가] API 호출 제한 도달. 수집된 데이터로 진행합니다.")
                    tracker.log_error("twitter")
                    break  # 더 이상 결과 처리하지 않음

                if error:
                    tracker.log_error("twitter")
                    print(f"[분석가] 검색 오류 ({query}): {error}")
                    continue

                # 성공
                tracker.log_api_call("twitter_read")
                all_texts.extend(texts)
                all_hashtags.extend(tags)

            except Exception as e:
                print(f"[분석가] 예상치 못한 오류 ({query}): {e}")
                tracker.log_error("twitter")

    if not all_texts and not all_hashtags:
        print("[분석가] 트윗을 가져오지 못했습니다. 기본 키워드를 사용합니다.")
        return _fallback_keywords()

    word_counter = Counter()

    for tag in all_hashtags:
        if tag not in STOP_WORDS and len(tag) > 2:
            word_counter[tag] += 2

    for text in all_texts:
        words = re.findall(r"[a-zA-Z]{3,}", text.lower())
        for word in words:
            if word not in STOP_WORDS:
                word_counter[word] += 1

    top_keywords = word_counter.most_common(MAX_KEYWORDS)
    results = [{"keyword": kw, "count": count} for kw, count in top_keywords]

    print(f"[분석가] 추출된 트렌드 키워드 {len(results)}개:")
    for item in results:
        print(f"  - {item['keyword']} (언급 {item['count']}회)")

    return results


def _fallback_keywords() -> list[dict]:
    fallback = [
        {"keyword": "coquette fashion", "count": 0},
        {"keyword": "quiet luxury", "count": 0},
        {"keyword": "streetwear aesthetic", "count": 0},
        {"keyword": "baggy jeans trend", "count": 0},
        {"keyword": "minimalist outfit", "count": 0},
    ]
    print("[분석가] 기본 샘플 키워드를 사용합니다:")
    for item in fallback:
        print(f"  - {item['keyword']}")
    return fallback


if __name__ == "__main__":
    keywords = fetch_trending_keywords()
    print("\n최종 결과:", keywords)
