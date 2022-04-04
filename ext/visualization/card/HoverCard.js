import PropTypes from "prop-types";
import {ToolTip} from "@f-ui/core";
import styles from './styles/Card.module.css'

export default function HoverCard(props) {
    return (
        <ToolTip className={styles.toolTip}>
            {props.children}
        </ToolTip>
    )
}
HoverCard.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    styles: PropTypes.object
}