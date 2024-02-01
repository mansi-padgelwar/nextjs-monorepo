import React from 'react';

interface ImageProps {
    src: string;
    alt: string;
    className?: string;
}

const ImageComponent: React.FC<ImageProps> = ({imagePath, styleObj, altText}) => {
    return <img src={imagePath} alt={altText} style={styleObj} />;
};

export default ImageComponent;
