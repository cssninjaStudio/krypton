export function initLike() {
    return {
        isLiked: false,
        likeAction() {
            this.isLiked = !this.isLiked;
        }
    }
}