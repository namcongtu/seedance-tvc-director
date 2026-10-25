# Seedance Video Director

Skill soạn prompt video Seedance **đa thể loại**, mặc định **15 giây** nếu người dùng chưa nêu thời lượng. Hỗ trợ Text-to-Video, Image-to-Video và video tham chiếu khi entry/model thực tế cho phép. Prompt tiếng Anh, giải thích tiếng Việt. Không gắn với một chủ đề, sản phẩm hoặc phong cách cố định.

Có phân tích brief/reference, character/object/environment lock, chuyển động có trọng lượng, camera, ánh sáng, âm thanh/thoại, storyboard, continuity, repair và production package. Không tự gọi API hoặc tiêu credit; khả năng model phải được xác minh theo phiên bản và entry.

## Cài đặt cục bộ

Giải nén `seedance-video-director.zip`, chép thư mục `seedance-video-director` vào thư mục Skills của ứng dụng hỗ trợ. Với Codex cục bộ theo cấu hình thường dùng trên Windows: `%USERPROFILE%\.codex\skills\seedance-video-director\SKILL.md`. Nếu đã cài bản cũ `veo-image-to-video-director`, gỡ bản cũ khỏi thư mục Skills để tránh gọi nhầm. Bắt đầu phiên mới và kiểm tra danh mục Skill của ứng dụng; metadata không tự chứng minh đã được nạp.

Codex Web: tải ZIP về máy không cài Skill vào cloud. Có thể yêu cầu Agent đọc `seedance-video-director/SKILL.md` trong checkout hiện tại.

## Cách dùng

> Sử dụng $seedance-video-director để thiết kế một video hành động hài trên tàu. Bạn đề xuất chuyển động và góc máy, viết prompt tiếng Anh, giải thích bằng tiếng Việt. Không render.

Nếu không ghi thời lượng, Skill dùng mục tiêu dựng 15 giây. Nếu ghi 8/20/30 giây thì giữ yêu cầu đó. Gửi ảnh nếu cần giữ ngoại hình theo ảnh; không có ảnh vẫn làm Text-to-Video từ brief. Không mặc định mọi bản Seedance hỗ trợ native 15 giây, audio hoặc multi-reference.

## Kiểm định

`evals/evals.json` chứa ca hành vi để kiểm định, chưa chạy model. Kiểm tra file/JSON/link/ZIP chỉ xác minh cấu trúc, không bảo đảm chất lượng video. Seedance TVC Director gốc trong repo được giữ nguyên.
