import styled from "styled-components";
import NewsItem from "./NewsItem";
import axios from "axios";
import usePromise from "../lib/usePromise";

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 2rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({ category }) => {
  const [loading, resolved, error] = usePromise(() => {
    const query = category === "all" ? "" : `&category=${category}`;
    return axios.get(`https://newsapi.org/v2/top-headlines?
      country=kr${query}&apiKey=db5808bc409b4c1a805de838b0473fe8`);
  }, [category]);

  // loading
  if (loading) {
    return <NewsListBlock>대기 중...</NewsListBlock>;
  }

  // resolve값이 없으면
  if (!resolved) {
    return null;
  }

  // error
  if (error) {
    return <NewsListBlock>에러 발생!</NewsListBlock>;
  }

  // resolved 값이 있으면
  const { articles } = resolved.data;
  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
