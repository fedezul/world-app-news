import { Link } from "react-router-dom";
import { Globe } from "lucide-react";
import { categories } from "../utils/utils";



export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold">WorldNews</span>
            </div>
            <p className="text-gray-400 mb-4">
              La tua fonte affidabile per le ultime notizie dal mondo.
              Resta aggiornato con le storie che contano davvero.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="https://www.instagram.com/federicozulloo/" target="_blank"
                rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile" target="_blank"
                rel="noopener noreferrer" className="hover:text-white transition-colors">Linkedin</a></li>
              <li><a href="https://gnews.io/" target="_blank"
                rel="noopener noreferrer" className="hover:text-white transition-colors">API Source</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Categorie</h3>
            <ul className="space-y-2 text-gray-400">
              {categories.slice(0, 4).map(category => (
                <li key={category.slug}>
                  <Link to={`/category/${category.slug}`} className="hover:text-white transition-colors">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p>&copy; 2025 WorldNews. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
};
