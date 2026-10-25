# Motion, camera và sửa lỗi

## Chuỗi tương tác

Ví dụ lấy bánh: khuôn nằm trên giá → tay tiếp cận → ngón tay tạo điểm giữ → khuôn nhấc khỏi giá → kéo qua miệng lò → cả tay/khuôn/bánh ra ngoài frame → giữ lò trống. Cửa lò phải mở hoàn tất trước khi tay vào. Không một tay cùng lúc giữ cửa và cầm khuôn ở vị trí không thể với tới. Nếu cần thêm khăn chống nóng, mô tả là đề xuất có thể đổi; giữ khuôn còn thấy được, không thêm găng che toàn bộ ngoại hình tay.

Viết vị trí bắt đầu/kết thúc, hướng rút, tay phải/trái giải phẫu và điểm tì. Không viết “tay di chuyển mượt” như thay cho lực nâng và trạng thái chạm. Khối lượng thể hiện bằng độ trễ cổ tay/hạ vai, không rung máy.

Camera: cận để đọc bề mặt → một pullback để thấy quy mô/tay → giữ máy khi tương tác. Không vừa orbit, zoom, rack focus vừa yêu cầu ngón tay chính xác. Ánh sáng giữ nguồn và hướng; heat shimmer nhẹ không làm cong khuôn. Nếu thời gian cho nhiều việc quá ngắn, đề xuất tách baking close-up và removal shot, không thay đổi yêu cầu một shot âm thầm.

## Repair theo lớp

- Khuôn bị đổi: mô tả lại viền, thành, đáy/foil từ ảnh; loại đúng kiểu vật thay thế đã xuất hiện; khóa identity trước hiệu ứng.
- Kích thước sai: dùng quan hệ bàn tay/vật của ảnh và một khoảng đồng hiện; bỏ các số đo do prompt tự đặt, không tùy tiện viết “tiny”.
- Tay méo: giảm chuyển động camera; chỉ một tay hành động, điểm nắm rõ; không đòi thấy ngón bị che.
- Teleport: yêu cầu tiếp xúc trước di chuyển, đường đi liên tục và hoàn tất; vật không được tự tách khỏi tay.
- Nền đổi: reference môi trường/hướng sáng, giới hạn frame, không thêm đồ vật, xóa yêu cầu chuyển cảnh mâu thuẫn.

Repair tiếng Anh nên có: Preserve [lớp đã đạt]. Correct only [lỗi chính]. [Trạng thái đúng có thể quan sát]. Keep [đầu/cuối và tay sở hữu]. Không cam kết model giữ nguyên pixel; edit phải có khả năng thật.

Nếu người dùng chỉ báo lỗi bằng chữ, ghi đó là triệu chứng được báo, không nói đã xem lỗi. Nếu nhận clip, xem toàn cảnh rồi trích trước tiếp xúc/chạm/nâng/di chuyển/kết thúc; kiểm tra cả khoảng che khuất. Lưu passed/failed/unverified riêng, không tuyên bố một prompt repair đã giải quyết trước khi có kết quả.
