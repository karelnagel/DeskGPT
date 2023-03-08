import { github } from "~/config";
import { Download } from "../components/Download";

export default function Page() {
  return (
    <div className="flex w-full flex-col items-center justify-between md:flex-row">
      <div className="max-w-xl space-y-6">
        <h1 className="text-[54px] font-bold">ChatGPT in your PC</h1>
        <h2 className="text-xl">
          ChatGPT client for Mac, Windows and Linux, for super easy and fast
          access. Just press <code>Ctrl + Shift + G</code> to start typing and{" "}
          <code>Enter</code> to get answers.
        </h2>
        <div className="flex space-x-2">
          <Download />
          <a
            href={github}
            target="_blank"
            className="btn-outline btn w-60 text-xl normal-case"
          >
            GitHub
          </a>
        </div>
      </div>
      <div className="py-16">
        <video
          src={"/recording.mov"}
          autoPlay
          muted
          loop
          className="w-96 rounded-xl "
        />
      </div>
    </div>
  );
}
