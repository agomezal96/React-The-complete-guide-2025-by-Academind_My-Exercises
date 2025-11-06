export default function Input({label, id, ...rest}) {
    return (
        <div className="control">
            <label htmlFor={id}>
                {label}
            </label>
            <input name={id} required {...rest}/>
        </div>
    )
}