import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  title: string;
  returnDelete?: (title: string) => void;
}

function TagsSearch({ title, returnDelete }: Props) {
  return (
    <span className="tags-theme py-1 flex items-center">
      {title}
      <div onClick={() => returnDelete && returnDelete(title)}>
        <FontAwesomeIcon className="text-[10px] cursor-pointer" icon={["fas", "x"]} />
      </div>
    </span>
  )
}

export default TagsSearch