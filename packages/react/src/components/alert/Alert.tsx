import React from "react";
import styles from "./Alert.module.css";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'success' | 'error' | 'warning' | 'info';
}

export const SDSAlert = React.forwardRef<HTMLDivElement, AlertProps>(({ variant = 'info', ...props }, ref) => {
    const classNames = [
        styles.alert,
        styles[variant],
        props.className,
    ]
        .filter(Boolean)
        .join(' ');
    return (
        <div ref={ref} className={classNames} />
    );
}
);

SDSAlert.displayName = 'SDSAlert';