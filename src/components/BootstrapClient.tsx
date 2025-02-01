"use client"

import { useEffect } from "react"

const BootstrapClient = () => {
  useEffect(() => {
    // Initialize Bootstrap JavaScript
    require("bootstrap/dist/js/bootstrap.bundle.min.js")
  }, [])

  return null
}

export default BootstrapClient 