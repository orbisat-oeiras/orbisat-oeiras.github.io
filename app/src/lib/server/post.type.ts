export type Post = {
	path: string;
	title: string;
	date: Date;
	date_string: string;
	cover_image: string;
	cover_image_exists: boolean;
	excerpt: string;
	hidden: boolean;
	content: string | never;
};
