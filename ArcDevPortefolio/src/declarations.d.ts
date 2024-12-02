declare module "*.css" {
    const content: { [className: string]: string };
    export default content;
}

declare module "swiper/css";
declare module "swiper/css/navigation";
declare module "swiper/css/effect-fade";
declare module "swiper/css/effect-coverflow";