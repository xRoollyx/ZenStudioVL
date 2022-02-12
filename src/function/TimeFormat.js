import React from "react";

export function dashFormatDate (noFormatDate) {
    const formatDate = noFormatDate.getDate() + '-' + noFormatDate.getMonth() + '-' + noFormatDate.getFullYear()
    return formatDate
}

export function dotFormatDate (noFormatDate) {
    const formatDate = noFormatDate.getDate() + '.' + noFormatDate.getMonth() + '.' + noFormatDate.getFullYear()
    return formatDate
}