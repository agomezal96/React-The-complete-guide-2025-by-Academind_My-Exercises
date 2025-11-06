export default function Button({children, textOnly, className, ...rest}) {
    // const cssClasses = textOnly ? `text-button ${className}}` : `button ${className}`;
    let cssClasses = textOnly ? 'text-button' : 'button';
    cssClasses += ' ' +  className;

    return (
    <button className={cssClasses} {...rest}>
        {children}
    </button>
    )
}