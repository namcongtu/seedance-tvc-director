# Veo Image-to-Video Director

Skill tổng hợp quy trình phân tích ảnh, khóa ngoại hình/cấu trúc/tỷ lệ, đạo diễn chuyển động/camera/âm thanh, prompt tiếng Anh, giải thích tiếng Việt và repair sau render. Ưu tiên Veo nhưng không hardcode tính năng theo tên model chung chung. Có thể chuẩn bị production package nhiều shot.

## Dùng trực tiếp trong checkout

Yêu cầu Agent đọc `veo-image-to-video-director/SKILL.md` trong repo này, sau đó gửi ảnh, hành động, thời lượng và nền tảng/model đang sử dụng. Đây là cách dùng được chuẩn bị, không phải bằng chứng Codex đã tự nhận diện hoặc cài Skill.

Ví dụ:

> Đọc veo-image-to-video-director/SKILL.md. Phân tích ảnh mini cake của tôi, giữ nguyên khuôn và tỷ lệ khuôn–tay như ảnh. Tôi muốn cận bánh chín rồi tay lấy khuôn khỏi frame, mục tiêu dựng 10s. Hãy kiểm tra mâu thuẫn frame đầu, không tự đặt số cm, viết một prompt tiếng Anh và giải thích tiếng Việt. Chưa gọi API.

Muốn cài vào thư mục Skill của một ứng dụng, dùng cơ chế cài đặt của ứng dụng đó. File agents/openai.yaml chỉ cung cấp metadata, không chứng minh đã được nạp. Không thay đổi Seedance TVC Director gốc.

## Kiểm định

`evals/evals.json` chứa ca đánh giá hành vi bằng prompt/assertions. Không có runner model kèm theo. Parse được JSON và file link hợp lệ chỉ xác nhận cấu trúc, không có nghĩa các ca hành vi đã chạy hoặc video sẽ giữ vật thể tuyệt đối.
