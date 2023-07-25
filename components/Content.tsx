'use client';

import DOMPurify from "dompurify";

const Content = ({
    text
}: { text: string }) => {

    return (
        <div
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(text),
            }}
        ></div>
    );
};

export default Content;