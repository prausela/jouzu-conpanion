import useResizeObserver from "@react-hook/resize-observer";
import { useLayoutEffect, useState } from "react";

const useHeight = (target) => {
    const [height, setHeight] = useState();

    useLayoutEffect(() => {
        setHeight(target.current.offsetHeight)
    }, [target]);

    useResizeObserver(target, (entry) => {
        return setHeight(entry.contentRect.height);
    });
    return height;
}

export default useHeight;