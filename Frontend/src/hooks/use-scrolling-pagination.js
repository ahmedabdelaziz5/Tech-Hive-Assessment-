import { useCallback, useRef, useState } from "react";

const useScrollingPagination = (isLoading, pagesLimit) =>
{
    //hook for handle infinite scrolling pagination

    const [currentPage, setCurrentPage] = useState(0);
    const observer = useRef();

    //  run when last element visible only
    const lastElementRef = useCallback((node) =>
    {
        if (isLoading) return;

        // disconnect current observer 
        //bcs last element will be change for new last element
        if (observer.current) observer.current.disconnect();

        //  when last element visible
        observer.current = new IntersectionObserver(entries =>
        {
            // entries[0] bcs it's only one element
            // if reach bottom
            if (entries[0].isIntersecting)
            {
                if (currentPage < pagesLimit - 1)
                {
                    setCurrentPage(prev => prev + 1)
                }
            }
        })
        // handle  if there is last element observe it
        if (node) observer.current.observe(node);
    }, [isLoading, currentPage, pagesLimit, setCurrentPage])
    return {
        lastElementRef,
        currentPage
    }
}

export default useScrollingPagination