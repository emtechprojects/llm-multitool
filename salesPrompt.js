function SalesPrompt(part, area, preffered = null) {
    let prompt = `Im a sales represntative for an Australian electrical wholesaler and i want to identify the top 20 active or upcoming project sites in ${area} that offer the best opportunity for me to win electrical supply business.

    My Products: ${part}
    Preffered Projects: ${preffered}
    
    Search current information from reliable sources, including council/goverment planning portals, tender information, builder/developer websites, industry publications and project annoucements. Prioritise projects that are approved, tendering, awarded, mobilising or currently under construction, rather than speculative proposals.
    
    For each of the top 10 projects provide:
    • Project name, exact location and project type
    • Estimated value, current stage and construction dates
    • Developer/client, head contractor and electrical contracter
    • Best available first point of contact, job title, busniess phone and business email
    • Relevant source and date confirming the information
    • Why the project is a strong prospect
    • Likely electrical products required and procurement timing
    • Best sales approach and recommended first action
    • Prospecting score /100
    
    Never guess contact details. Use only publicly available business contact information. If an individualcannot be identified, provide the most relevant company/department contact and state that clearly
    
    Rank projects using: product relevance (25%), electrical-material opportunity (20%), timing (20%), identifiable decision maker (15%), project size (10%) and accesibility likelihood of winning (10%)
    
    Then create a practical prospecting action plan including:
    
    1. Top 3 projects to attack immediatley and who to contact first
    2. Contact sequence for all 10 prospects
    3. What product to lead with for each
    4. Specific sales angle, likely objection and response
    5. A tailored cold-call opener, first-contact email, follow up email and site-visit introduction.
    6. Likely competitors/incumbent suppliers where reliably identifiable and how to differentiate
    
    Focus on projects with the highest realistic near-term sales potential, not simply the largest projects.`    
    let cleanPrompt = prompt.trim()
    return cleanPrompt
}

export default SalesPrompt