import React from 'react';

interface ImageProps {
    imagePath: string;
    altText?: string;
    styleObj?: any;
}

const ImageComponent: React.FC<ImageProps> = ({imagePath, styleObj, altText}) => {
    return <img src={imagePath} alt={altText} style={styleObj} />;
};

export default ImageComponent;
