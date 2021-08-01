import React from "react";
import '../../styles/common/TextBlock.scss';

type TextBlockProps = {
    text: string,
    style?: object
}

const TextBlock: React.FC<TextBlockProps> = ({text, style}) => {
    return(
        <div className="text-block" style={style ? style : undefined}>
            <span>{text}</span>
        </div>
    )
}

export default TextBlock;