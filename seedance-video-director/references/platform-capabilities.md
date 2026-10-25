# Khả năng phiên bản và cách dùng bằng chứng

Tên “Seedance” chưa xác định ứng dụng, revision, chế độ hoặc tính năng. Không hardcode bảng khả năng dễ lỗi thời. Trước khi tuyên bố một tính năng có thật, ghi:

| Trường | Bằng chứng cần |
|---|---|
| Nền tảng/model/mode | Tên hiển thị hiện tại hoặc tài liệu chính thức đúng sản phẩm |
| Thời lượng native | Tùy chọn có thật trong chế độ đang dùng |
| Image input | First frame hay reference identity; số lượng/định dạng và vai trò |
| Last frame/multi-reference | Có hỗ trợ trong mode đó hay không |
| Audio/thoại | Có hỗ trợ, giới hạn kiểm soát; không bảo đảm phát đúng câu |
| Negative/seed/extend/edit | Chỉ đưa vào settings nếu có thật |
| Giá/quyền sử dụng | Chưa biết thì không ước tính credit hoặc tự thực thi |

Nếu có browsing, ưu tiên tài liệu chính thức của model/nhà cung cấp và entry tương ứng và phiên bản đang dùng; không lấy thông số nền tảng A áp sang B. Không yêu cầu token để kiểm tra tài liệu công khai. Ghi nguồn/ngày trong phần giải thích, không trong prompt hình ảnh.

Chưa biết platform: soạn prompt mô tả thông thường. Ví dụ: “15 giây là mục tiêu dựng, tùy chọn native chưa được xác minh.” Không nói “Seedance luôn chỉ tạo X giây” nếu chưa có nguồn đúng phiên bản. Nếu không hỗ trợ độ dài yêu cầu, đề xuất trim clip dài hơn hoặc nối shot có continuity sau khi biết tùy chọn thật; không kéo giãn mù hoặc tự hứa extension.

Frame tham chiếu khác first frame: nếu mode chỉ nhận first frame thì ảnh là trạng thái bắt đầu, prompt không đáng tin để thay toàn bộ trạng thái frame 0. Chuẩn bị ảnh đúng trước video khi cần. Không gọi ảnh chưa tồn tại là upload hoặc đặt số @Image giả.
