import React from "react";
import '../../styles/common/TextBlock.scss';

type TextBlockProps = {
    text: string
}

const TextBlock: React.FC<TextBlockProps> = ({text}) => {
    return(
        <div className="text-block">
            <span>{text}</span>
        </div>
    )
}

export default TextBlock;