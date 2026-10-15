import TemplateBlog from '../components/templates/TemplateBlog';
import { useTituloPagina } from '../Hooks/useTituloPagina';


function Blog() {
    useTituloPagina('Blogs')
    return (
        <TemplateBlog/>
    );
}

export default Blog;