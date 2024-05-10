export default function generateSlug(name){
    return name.toLowerCase().replace(/\s+/g,'-')
}
