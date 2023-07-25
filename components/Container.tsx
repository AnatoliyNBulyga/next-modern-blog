'use client';

interface ContainerProps {
    children: React.ReactNode;
    width?: string | number;
}

const Container: React.FC<ContainerProps> = ({
   children
}) => {
    return (
        <div className="container" >
            {children}
        </div>
    );
};

export default Container;