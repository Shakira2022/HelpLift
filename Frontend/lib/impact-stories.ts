// Curated impact stories shown to public (logged-out) visitors.
//
// These are static for now: the backend has no ImpactStory model, and the
// only place fulfilled-need data lives (`/api/platform/needs`) requires an
// authenticated session, so there is no public data source to pull real
// stories from yet. Update this list by hand until that backend work lands.
export type ImpactStory = {
  id: number
  title: string
  organization: string
  location: string
  review: string
  reviewer: string
  rating: number
}

export const impactStories: ImpactStory[] = [
  {
    id: 1,
    title: "School Supplies for 200 Children",
    organization: "Hope Academy Foundation",
    location: "Johannesburg Central",
    review: "Thanks to the HelpLift community, we received enough stationery and backpacks to equip our entire incoming class. The platform made coordinating the drop-off seamless.",
    reviewer: "Director Sarah M.",
    rating: 5,
  },
  {
    id: 2,
    title: "Winter Blankets Distribution",
    organization: "Community Care NPO",
    location: "Cape Town Shelters",
    review: "We posted an urgent need for 500 blankets before the cold front hit. Within 48 hours, verified givers had matched and fulfilled our entire request.",
    reviewer: "Jason K., Operations Lead",
    rating: 5,
  },
]
