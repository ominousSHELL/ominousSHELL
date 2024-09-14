import { CopyBlock, dracula } from "react-code-blocks"

export default function PayloadPreview(props: any) {
  return (
    <div className="xl:text-xl">
      <CopyBlock text={props.text} language={props.language} showLineNumbers={false} theme={dracula} codeBlock={true}/>
    </div>
  )
}