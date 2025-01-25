interface IProps{
 msg:string
}
export default function ErrorMessage({msg}:IProps) {
  return (
    <>

   { msg?<span className="block text-red-700 font-semibold text-sm">{msg}</span> :null}
    </>
  )
}