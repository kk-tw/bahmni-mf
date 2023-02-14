import styled from 'styled-components';
import { ComposedModal } from 'carbon-components-react';
import media from '../../styles/variables';

const SlidingModal = styled(ComposedModal)`
    &.cds--modal {
        background-color: transparent;

        @media ${media.tablet} {
            justify-content: flex-end;
        }
    }

    .cds--modal-container {
        @media ${media.tablet} {
            max-height: none;
            height: 100%;
            transform: translate3d(100%, 0, 0);
        }
    }

    .cds--modal-content {
        & > * {
            margin-bottom: 2em;
        }
    }
`;

export default SlidingModal;
