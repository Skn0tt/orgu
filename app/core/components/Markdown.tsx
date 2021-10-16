import ReactMarkdown from "react-markdown"

const Markdown = ({ value }: { value: string }) => {
  return <ReactMarkdown>{value}</ReactMarkdown>
}

export default Markdown
