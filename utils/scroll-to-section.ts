export function scrollToSection(sectionId: string) {
  // Remove the leading slash and hash if present
  const id = sectionId.replace(/^\/?#/, "")
  const element = document.getElementById(id)

  if (element) {
    // Get the height of the navbar (assuming it's fixed)
    const navbarHeight = 80 // Adjust this value based on your navbar height

    // Calculate the position to scroll to
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight

    // Scroll to the element
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })

    // Update the URL without causing a page reload
    history.pushState(null, "", `/#${id}`)

    return true
  }

  return false
}

