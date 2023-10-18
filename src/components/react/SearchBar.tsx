import { useState } from "react";

interface Props {
  searchList: SearchItem[];
}

export type SearchItem = {
  title: string;
  url: string;
};

export default function SearchBar({ searchList }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [titleArr, setTitleArr] = useState<SearchItem[]>([]);

  function handleChange(event: any) {
    const value = event.target.value;
    setInputValue(value);

    if (event.target.value == "") {
      setTitleArr([]);
      return;
    }

    const posts = searchList.filter((post) => {
      const searchTermWords = inputValue
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase()
        .split(" ");
      const title = post.title.trim().replace(/\s+/g, " ").toLowerCase();
      return searchTermWords.every((word) => title.includes(word));
    });
    setTitleArr(posts);
  }
  const iptStyle = {
    width: '24rem',
    background: "transparent",
    border: "1px solid #3d7387",
    "border-radius": "12px",
    padding: "5px 10px",
    color: "#3d7387",
    "margin-bottom": "20px",
    outline: "none",
  };
  return (
    <div>
      <input
        style={iptStyle}
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="请输入内容..."
      />
      <ul>
        {titleArr.map((item) => (
          <li key={item.url}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
