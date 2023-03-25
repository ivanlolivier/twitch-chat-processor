import { useState } from "react";

export default function useTwitchParams() {
    const url = new URL(document.location.href.replace('#','?'))
    const params = {}
    url.searchParams.forEach((value, name) => (params[name] = value))
    return params;
}
