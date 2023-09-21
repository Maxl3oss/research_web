import { SVG_Dashboard, SVG_Home } from "./DataSVG";

const SideData = {
  "admin": [
    { "id": 1, "link": "/research/", "name": "Home", "icon": SVG_Home, },
    { "id": 2, "link": "/back/dashboard", "name": "Dashboard", "icon": SVG_Dashboard }
  ],
  "user": [
    { "id": 1, "link": "/research/", "name": "Home", "icon": SVG_Home }
  ]
}

export default SideData;

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={"w-4 h-3 arrow-right " + className}>
      <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
    </svg>
  )
}