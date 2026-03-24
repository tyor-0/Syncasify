import React from 'react'

function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-3">
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl">
        🚧
      </div>
      <h2 className="text-lg font-semibold text-foreground">Coming Soon</h2>
      <p className="text-sm text-muted-foreground text-center max-w-sm">
        This page is currently under construction. Check back soon.
      </p>
    </div>
  )
}

export default ComingSoon;