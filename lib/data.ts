export const homeLinks = [
    {
      name: "Home",
      hash: "#home",
    },
    {
      name: "About",
      hash: "#about",
    },
    {
      name: "Features",
      hash: "#features",
    },
    {
      name:"Help",
      hash:"#help"  
    }
] as const;

export const dashboardLinks = [
  {
    name:"Profile",
    link:"/dasboard/profile"
  },
  {
    name:"Communities",
    link:"/dasboard/communities"
  },
  {
    name:"Friends",
    link:"/dasboard/friends"
  }
]