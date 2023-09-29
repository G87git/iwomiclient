export default function LoginInput({label, tooltip}) {
    return (
        <div className="flex justify-between items-center space-x-20 relative">
        <label htmlFor="" className="text-xs">{label}</label>
        <input className="" type="text" />
        {/* {tooltip && <div className="tooltip">
        <p>Find all the important information you need to bank securely and with peace of mind.</p>
        </div>} */}
    </div>
    )
}