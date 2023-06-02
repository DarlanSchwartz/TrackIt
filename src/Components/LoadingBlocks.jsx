import { Blocks } from "react-loader-spinner";
import styled from "styled-components";

export default function LoadingBlocks() {
    return (
        <ContainerLoading>
            <Blocks visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" />
        </ContainerLoading>
    );
}

const ContainerLoading = styled.div`
    position: fixed;
    z-index: 4;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
`;