import React, { useEffect, useState } from "react";

interface IPaginationProps {
    totalPages: number;
    changePage: CallableFunction;
}

export const PaginationComponent = (props: IPaginationProps) => {

    const listData: Array<number> = Array.from({ length: props.totalPages }, (v, k) => k + 1);
    const totalPage = listData.length;
    const [currentPage, setCurrentPage] = useState(1 as number);
    const [oldCurrentPage, setOldCurrentPage] = useState(0 as number);
    const [scrollRef, setScrollRef] = useState(null as any);
    const [allViewRef, setAllViewRef] = useState({} as any);

    const changePage = (item: number) => {
        setCurrentPage(item);
        props.changePage(item);
    }

    const _onLayout = (item: number, layoutProps: any) => {
        setAllViewRef({ ...allViewRef, [`view${item}`]: layoutProps.nativeEvent });
    }

    useEffect(() => {
        if (currentPage !== oldCurrentPage) {
            scrollToView();
            props.changePage(currentPage);
        }
    }, [allViewRef]);

    // const _renderItem = ({ item }: { item: number }) => {
    //   return (
    //     <View key={item.toString()} onLayout={(layoutProps) => _onLayout(item, layoutProps)}>
    //       <TouchableOpacity style={[styles.btnView, currentPage == item && styles.activeBtnView]} onPress={() => changePage(item)}>
    //         <Text style={styles.btnText}>{item}</Text>
    //       </TouchableOpacity>
    //     </View>
    //   )
    // }

    const nextPageChange = () => {
        if (currentPage < listData.length) {
            const newPageNumber = currentPage + 1;
            changePage(newPageNumber);
        }
    }

    const prePageChange = () => {
        if (1 < currentPage) {
            const newPageNumber = currentPage - 1;
            changePage(newPageNumber);
        }
    }

    const scrollToView = () => {
        setOldCurrentPage(currentPage);
        setTimeout(() => {
            const page = `view${currentPage}`;
            if (allViewRef[page]?.layout) {
                scrollRef.scrollTo({ x: allViewRef[page].layout.x })
            }
        }, 500);
    }

    return (
        <ul className="pagination">
            <li className="page-item" >
                <a className="page-link" href="javascript:void(0)" onClick = {()=>{changePage(1)}} aria-label="First">
                <span>First</span>
                </a>
            </li>
            <li className="page-item">
                <a className="page-link" href="javascript:void(0)" onClick={() => prePageChange() } aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                </a>
            </li>
            {listData.map((page: any) => (
                <li className={`page-item ${currentPage == page && 'active'}`} key={page}><a className="page-link" href='javascript:void(0)' onClick={() => changePage(page)}>{page}</a></li>
            ))}
            <li className="page-item">
                <a className="page-link" href="javascript:void(0)" onClick={() => nextPageChange()} aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                </a>
            </li>
            <li className="page-item" >
                <a className="page-link" href="javascript:void(0)" onClick = {()=>{changePage(parseInt(`${totalPage}`))}} aria-label="First">
                <span>Last</span>
                </a>
            </li>
        </ul>
    );
}

