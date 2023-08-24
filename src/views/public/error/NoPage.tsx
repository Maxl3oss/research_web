import noPageImage from "@assets/images/NoPage2.gif";

export default function NoPage() {
  return (
    <div className="flex h-screen">
      <div className="mt-52 m-auto md:m-auto">
        <img className="md:h-96 w-auto" alt="" src={noPageImage} />
      </div>
    </div>
  );
}
