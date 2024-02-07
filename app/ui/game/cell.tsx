import { CellOptions } from "../types"

export default function Cell({type}: {type: CellOptions}) {
    return (<div className={`w-[32px] h-[32px] border-[#333333] border-[1px] ${type}`}></div>)
}