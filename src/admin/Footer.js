import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Footer() {
  return (
    <>
      <hr />
      <div className=" text-center mb-2 grid md:grid-cols-3  2xl:grid-cols-5 space-x-10 space-y-5   max-w-[1500px] mx-auto mt-8  font-bold text-lg">
        <div className="text-sm mb-3 xl:text-left text-center  ">
          <img
            className="h-32 w-48 mt-1 xl:mx-0 mx-auto text-left  "
            src="Image/Screenshot_2023-05-24_082524-removebg-preview.png"
            alt="Workflow"
          />
          Power by Project @
        </div>
        <div className="text-left mb-3">
          <h2 className="uppercase text-xl">Contact</h2>
          <ul className="-ml-8 text-base font-medium">
            <li>
              {" "}
              Address:{" "}
              <a className="font-normal text-black">
                Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành
                phố Hồ Chí Minh{" "}
              </a>
            </li>
            <li>
              {" "}
              Phone: <a className="font-normal text-black"></a>
            </li>
            <li>
              {" "}
              Email: <a className="font-normal text-black"></a>
            </li>
          </ul>
          <div className="flex gap-4  justify-center lg:justify-start">
            <div className="text-blue-400">
              <FacebookIcon />
            </div>
            <div className="text-pink-400">
              <InstagramIcon />
            </div>
            <div className="text-blue-400">
              <TwitterIcon />
            </div>
            <div className="text-red-400">
              <YouTubeIcon />
            </div>
          </div>
        </div>
        <div className="text-left mb-3">
          <h2 className="uppercase text-xl">Introduce</h2>
          <ul className="-ml-8 text-base font-medium">
            <li className="font-normal cursor-pointer">About Me</li>
          </ul>
        </div>
        <div className="text-left mb-3">
          <h2 className="uppercase text-xl">Policy</h2>
          <ul className="-ml-8 text-base font-medium">
            <li className="font-normal cursor-pointer">
              Information privacy policy
            </li>
            <li className="font-normal cursor-pointer">How it works</li>
            <li className="font-normal cursor-pointer">Incidents and complaints</li>
          </ul>
        </div>

      </div>
    </>
  );
}
