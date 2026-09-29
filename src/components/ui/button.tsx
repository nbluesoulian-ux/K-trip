import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent bg-clip-padding font-semibold whitespace-nowrap transition-all duration-200 outline-none select-none disabled:pointer-events-none disabled:opacity-50 disabled:bg-[#E5E5E5] disabled:text-[#999999] disabled:transform-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#D32F2F] text-white hover:bg-[#B92525] hover:-translate-y-0.5 active:bg-[#921D1D] active:translate-y-0 focus-visible:ring-3 focus-visible:ring-[#D32F2F]/25 focus-visible:outline-none shadow-sm",
        outline:
          "border border-[#EAEAEA] bg-white text-[#171717] hover:bg-[#FAFAFA] hover:border-[#D6D6D6] hover:-translate-y-0.5 active:bg-[#F5F5F5] active:translate-y-0 focus-visible:ring-3 focus-visible:ring-[#D32F2F]/25",
        secondary:
          "border border-[#EAEAEA] bg-[#FAFAFA] text-[#171717] hover:bg-[#F5F5F5] hover:-translate-y-0.5 active:bg-[#EAEAEA] active:translate-y-0 focus-visible:ring-3 focus-visible:ring-[#D32F2F]/25",
        ghost:
          "text-[#555555] hover:text-[#171717] hover:bg-[#FAFAFA] focus-visible:ring-2 focus-visible:ring-[#D32F2F]/25",
        destructive:
          "bg-[#C62828] text-white hover:bg-[#B92525] hover:-translate-y-0.5 active:bg-[#921D1D] active:translate-y-0",
        link: "text-[#D32F2F] underline-offset-4 hover:underline",
      },
      size: {
        // Large CTA per DESIGN.md: height 52px, padding 24px, font 16px
        lg: "h-[52px] gap-2 px-6 text-[16px] [&_svg:not([class*='size-'])]:size-5",
        // Default Button per DESIGN.md: height 46px, padding 20px, font 16px
        default: "h-[46px] gap-2 px-5 text-[16px] [&_svg:not([class*='size-'])]:size-4.5",
        // Small Button per DESIGN.md: height 38px, font 15px
        sm: "h-[38px] gap-1.5 px-3.5 text-[15px] [&_svg:not([class*='size-'])]:size-4",
        icon: "size-[46px] rounded-xl",
        "icon-sm": "size-[38px] rounded-xl",
        "icon-lg": "size-[52px] rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
