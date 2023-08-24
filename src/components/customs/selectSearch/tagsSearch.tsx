interface Props {
  title: string;
  returnDelete?: (title: string) => void;
}

function TagsSearch({ title, returnDelete }: Props) {
  const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 cursor-pointer">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
  return (
    <span className="tags-theme p-1">
      {title}
      <div onClick={() => returnDelete && returnDelete(title)}>
        <XIcon />
      </div>
    </span>
  )
}

export default TagsSearch