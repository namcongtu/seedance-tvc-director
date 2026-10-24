# Kiểm định pilot V2

## Đã chạy thực tế

Chromium headless qua Playwright, HTTP cục bộ. 1.441 mẫu t=0…6 với bước 1/240s, kiểm tra IK và tọa độ. Play, Pause và tự dừng ở 6,000s chạy thành công; không có pageerror. Chân hai đoạn giữ đúng 46 px (sai số số thực khoảng 1,3e-13 px). Root bước tối đa khoảng 1,171 px trên mỗi 1/240s; không reset vị trí nhân vật.

Lần đầu phát hiện IK vượt tầm với 7,38 px ở Xanh sau đáp. Đã hạ hông theo tầm với và thêm blend nối recovery; kiểm tra lại max IK clamp = 0. Nhãn contact ở phần chuyển lấy đà cũng được sửa: chân đang chuyển vị không được tính là đã khóa mặt đất.

MP4 đã kiểm tra ffprobe: H.264/yuv420p, 1280×720, 24 fps, 144 frame, 6.000000 giây. FFmpeg giải mã toàn bộ không báo lỗi. Không có audio stream.

## Review hình ảnh

Đã chụp và xem ảnh các mốc 1,4 / 1,65 / 1,71 / 2,1 / 2,79 / 2,91 / 3,4 / 3,66 / 4,3 giây, đồng thời xem contact sheet 3×3 theo thứ tự đó. Ảnh nằm trong poses/; số và thời gian nằm ở tên file, không vẽ lên frame.

Quan sát: co chân đọc được khi bay; Đỏ nén thấp rõ ở 2,91s; silhouette nghiêng và tay đối trọng ở 3,4s tạo khác biệt với chạy; hai người cùng phía camera, đúng màu; khe tàu không bị đổi vị trí trong tọa độ thế giới. Các mục tiêu tiếp đất 916/968 nằm trên mái toa sau (bắt đầu x=870).

## Hạn chế còn lại

- Chưa có đánh giá phát lại bằng người xem độc lập; kiểm tra ảnh và số học không chứng minh animation đã đẹp hoặc đạt chuẩn production.
- Chuyển tốc độ dọc giữa parabol và key hấp thụ lực được thiết kế bằng pha riêng, chưa có solver động lực học liên tục về gia tốc; có thể vẫn cảm giác gắt ở tiếp xúc.
- Khóa chân áp dụng ở các pha trụ xác định; các pha chuyển tiếp, chuẩn bị bật và bước sửa vẫn là đặt chân nghệ thuật, không hoàn toàn no-slip. Blend tay trong recovery có thể làm chiều dài tay thay đổi nhẹ; chân IK giữ chiều dài.
- Cần polish thêm follow-through của cổ/đầu và offset giữa vai/hông; nét mặt còn đơn giản. Chưa thêm smear vì ưu tiên silhouette rõ; không có âm thanh.
- Chưa kiểm tra Safari, Firefox hoặc điện thoại thật.
- Pilot không mở rộng lên 30 giây. V1 và Skill gốc giữ nguyên. Chưa commit/push V2.
