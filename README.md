# Skill thiết kế giao diện và viết câu chữ cho Claude Code

Gói gồm hai skill, đã dùng cho bản demo TraLuật:

- **`thiet-ke-giao-dien`**: rà và nâng giao diện web có bằng chứng. Chụp mọi trạng thái trên máy tính và điện thoại **trước** khi sửa, xếp lỗi theo mức nặng, sửa theo lô, chụp lại một vòng, rồi mới đưa lên. Kèm công cụ chụp `chup.mjs` (chỉ cần Node ≥ 22 và Chrome, không cần Puppeteer).
- **`viet-cau-chu`**: viết và rà câu chữ tiếng Việt, gồm chữ trên giao diện (nút, lỗi, trạng thái rỗng), trang giới thiệu, bài đăng, tít ảnh/video, báo cáo. Luật sàn: tiếng Việt thường thay thuật ngữ, không con số bịa, không dùng "nhất/số một" (Luật Quảng cáo), ngắt dòng tít đúng cụm, sửa số liệu mà giữ giọng.

## Cài

```bash
claude plugin marketplace add https://github.com/davidlee2199/skill-thiet-ke-giao-dien
claude plugin install thiet-ke-giao-dien@skill-thiet-ke
```

Mở phiên Claude Code mới là dùng được.

Khuyên cài thêm **impeccable** (Apache 2.0, của pbakaus). Skill này dùng nó để rà kỹ và dò lỗi thiết kế:

```bash
npx skills add pbakaus/impeccable
```

Không muốn cài dạng plugin thì chép thư mục `plugins/thiet-ke-giao-dien/skills/thiet-ke-giao-dien` vào `~/.claude/skills/`.

## Dùng

Nói với Claude Code: *"coi lại UI/UX trang này cho đàng hoàng"*, *"rà giao diện trước khi đưa khách"*, *"kiểm responsive"*… thì skill thiết kế tự nạp. Nói *"viết lại cho dễ hiểu"*, *"rà câu chữ"*, *"viết caption"*, *"viết bài giới thiệu"*… thì skill viết chữ tự nạp.

Chụp tay:

```bash
node ~/.claude/plugins/cache/skill-thiet-ke/thiet-ke-giao-dien/1.0.0/skills/thiet-ke-giao-dien/cong-cu/chup.mjs \
  http://127.0.0.1:8000 ./anh ./canh.json
```

`canh.json` khai báo các cảnh cần chụp (trang, cỡ màn hình, thao tác bấm/gõ, điều kiện chờ). Xem mẫu ở `cong-cu/canh-mau.json`.

## Cập nhật

```bash
claude plugin marketplace update skill-thiet-ke
claude plugin update thiet-ke-giao-dien@skill-thiet-ke
```
