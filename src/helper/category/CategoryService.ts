import Category from './Category';
import CategoryThumbnail from './CategoryThumbnail';
import ImageService from '../image/ImageService';

export default class CategoryService {
    static format(json: any): Category {
        return {
            id: json.id,
            displayName: json.displayName
        };
    }

    static formatWithThumbnail(json: any): CategoryThumbnail {
        const category = this.format(json);
        const image = ImageService.format({ category, ...json.thumbnail.image });
        
        return {
            category,
            image
        }
    }

    static getThumbnailUrl(categoryThumbnail: CategoryThumbnail, resolutionType: string): string {
        const thumbnailTypes = ['thumbnail_medium', 'thumbnail_small'];
        const { image } = categoryThumbnail;

        if (thumbnailTypes.includes(resolutionType)) {
            return `http://localhost:8000/file/image/${resolutionType}/${image.id}`;
        }
        return `http://localhost:8000/image/file/thumbnail_medium/${image.id}`;
    }
}