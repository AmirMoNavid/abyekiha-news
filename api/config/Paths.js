import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const paths = {
    clientDistDir: path.join(__dirname, '../../', 'client', '.next'),
    publicDir: path.join(__dirname, '../../', "public")
}